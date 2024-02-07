export const handleEmails = (arr:any) => {
    return arr.flatMap((obj:any) =>
      // @ts-ignore
      Object.values(obj).filter((value) => value !== "" && value.includes("@"))
    );
  };
  