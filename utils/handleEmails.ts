export const handleEmails = (arr:any) => {
    return arr.flatMap((obj:any) =>
      Object.values(obj).filter((value) => value !== "" && value.includes("@"))
    );
  };
  