export const getData = async (api: string): Promise<any> => {
  const theResponse = await fetch(api, {
    cache: "no-store",
  }).then((response) => response.json());

  return theResponse;
};
