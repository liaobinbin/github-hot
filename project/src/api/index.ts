export const getGithubInfo = async (type: string, page: number) => {
  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1${
        type ? '+language:' + type : ''
      }&sort=starts&order=desc&type=Repositories&page=${page}`,
    );
    return res.json();
  } catch (err) {
    alert(err);
  }
};

export const getUser = async (userId: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${userId}`);
    return res.json();
  } catch (err) {
    alert(err);
  }
};
