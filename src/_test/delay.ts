export const delay = (callback: () => unknown, ms: number | undefined) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, ms);
  });
