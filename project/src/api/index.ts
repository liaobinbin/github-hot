export const getGithubInfo = async (type: string, page: number) => {
  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1${
        type ? '+language:' + type : ''
      }&sort=starts&order=desc&type=Repositories&page=${page}`,
    );
    return res.json();
  } catch (err) {
    // Do something
    alert(err);
  }
};
