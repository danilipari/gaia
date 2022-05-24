import { inject } from "vue";

import useRouter from "@/router/index";

export const timestampToDate = (date: number, time: false) => {
  const ISO = new Date(date).toISOString();
  const day = ISO.split('T')[0].split('-');
  const hour = ISO.split('T')[1].split('.')[0].split(':');
  if(time) {
    return `${day[2]}/${day[1]}/${day[0]} ${hour[0]}:${hour[1]}:${hour[2]}`;
  } else {
    return `${day[2]}/${day[1]}/${day[0]}`;
  }
}

export const goBack = () => {
  console.log('back here');
  useRouter.back();
}

export const structuredClone = (value: any) => {
  return JSON.parse(JSON.stringify(value));
}