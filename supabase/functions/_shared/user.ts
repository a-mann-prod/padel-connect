export const getUsername = (...args: (string | null | undefined)[]) =>
  args
    .reduce<string[]>((acc, curr, index) => {
      if (!curr || curr === "" || curr === null || curr === undefined)
        return acc;

      const isLast = index === args.length - 1;

      let newItem;
      if (isLast) {
        newItem = `${curr.charAt(0).toUpperCase()}.`;
      } else {
        newItem = curr
          .split(" ")
          .reduce<string[]>(
            (acc, curr) => [
              ...acc,
              `${curr.charAt(0).toUpperCase()}${curr.slice(1).toLowerCase()}`,
            ],
            []
          )
          .join(" ");
      }

      return [...acc, newItem];
    }, [])
    .join(" ");
