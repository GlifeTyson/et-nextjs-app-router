export const domainOpts = () => {
  let opts = { domain: `${process.env.REACT_APP_DOMAIN}` };
  if (process.env.NODE_ENV === "development") {
    opts = { domain: "" };
  }

  return opts;
};
