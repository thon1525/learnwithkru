export function getLocalStorage(name: string) {
  const item = localStorage.getItem(name);
  console.log(item);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorage(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data));
}

export const getCurrentDateTime = () => {
  return new Date().toLocaleString(); // Or any preferred date-time format
};


export function setLocalStorageTeacher(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data));
}



export function getLocalStorageTeacher(name: string) {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
}


export function clearLocalStorage(name: string) {
  localStorage.removeItem(name);
}