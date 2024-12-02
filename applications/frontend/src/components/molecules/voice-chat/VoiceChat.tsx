"use client";
import { AudioRecording, VoiceInputProp } from '@/@types/chat/chatType';
import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardVoice, MdStop } from 'react-icons/md';

const VoiceInput: React.FC<VoiceInputProp> = ({ setRecordings }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSoundDetected, setIsSoundDetected] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIdRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, []);

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const audioContext = new AudioContext();
          const analyser = audioContext.createAnalyser();
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);

          audioContextRef.current = audioContext;
          analyserRef.current = analyser;

          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];

          mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };

          const checkForSound = () => {
            const bufferLength = analyser.fftSize;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);

            const soundDetected = dataArray.some(value => value > 128 + 10 || value < 128 - 10);
            setIsSoundDetected(soundDetected);

            animationFrameIdRef.current = requestAnimationFrame(checkForSound);
          };

          checkForSound();
          mediaRecorder.start();
          setIsRecording(true);
        })
        .catch(error => console.error('Error accessing media devices.', error));
    } else {
      console.error('Media devices are not supported in this browser.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        if (isSoundDetected) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioURL = URL.createObjectURL(audioBlob);
          recordingIdRef.current += 1;
          const newRecording: AudioRecording = { id: recordingIdRef.current, audioURL };
          setRecordings(prevRecordings => [...prevRecordings, newRecording]);
        } else {
          console.log('No sound detected, not saving recording.');
        }

        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
        setIsRecording(false);
        setIsSoundDetected(false);
      };
    }
  };

  return (
    <div>
      {isRecording ? (
        <MdStop
          className={`w-6 h-6 cursor-pointer ${isSoundDetected ? 'text-red-500' : 'text-gray-500'}`}
          aria-label="Stop recording"
          onClick={stopRecording}
        />
      ) : (
        <MdKeyboardVoice
          className="w-6 h-6 cursor-pointer"
          aria-label="Start recording"
          onClick={startRecording}
        />
      )}
    </div>
  );
};

export default VoiceInput;
