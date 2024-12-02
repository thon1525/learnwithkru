 export interface ChatProp {
  message: string
}



// @/@types/chat/chatType.ts

export interface AudioRecording {
    id: number;
    audioURL: string;
  }
  
  export interface VoiceProps {
    setFormData: React.Dispatch<React.SetStateAction<ChatProp>>
    setRecordings: React.Dispatch<React.SetStateAction<AudioRecording[]>>;
    formData: ChatProp
  }
 export type VoiceInputProp = Pick<VoiceProps, "setRecordings" >;
