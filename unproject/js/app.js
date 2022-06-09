"use strict";

const getGithubInfo = (type, page) => {
  return fetch(
    `https://api.github.com/search/repositories?q=stars:%3E1${
      type ? "+language:" + type : ""
    }&sort=starts&order=desc&type=Repositories&page=${page}`
  )
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
};

class IconText extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="icon-text">
        <i
          className={`fa ${this.props.icon ? "fa-" + this.props.icon : ""}`}
          style={{ color: this.props.color || "#000" }}
        />
        {this.props.children}
      </span>
    );
  }
}

class Loading extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    );
  }
}

class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.select || "all",
    };
  }

  handleCurrentChange(value) {
    if (value !== this.state.current) {
      this.props.onChange(value);
      this.setState({
        current: value,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.current !== nextProps.select) {
      this.setState({
        current: nextProps.select,
      });
    }
  }

  render() {
    return (
      <ul className="tab">
        {this.props.list &&
          this.props.list.map((item, index) => {
            return (
              <li
                onClick={this.handleCurrentChange.bind(this, item)}
                className={this.state.current === item ? "active" : ""}
                key={`tab-list-${index}`}
              >
                {item}
              </li>
            );
          })}
      </ul>
    );
  }
}

/**
 * 格式化成千分位
 * @param {number | string} num
 * */
function formatNumber(num) {
  const reg = /(?!^)(?=(\d{3})+$)/g;
  return String.prototype.replace.call(num, reg, ",");
}

class Card extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <h3 className="card-rank">#{this.props.rank}</h3>
        <img alt="avatar" src={this.props.avatar} />
        <h4 className="card-name">{this.props.name}</h4>
        <IconText icon="user" color="orange">
          {formatNumber(this.props.user)}
        </IconText>
        <IconText icon="star" color="yellow">
          {formatNumber(this.props.star)} star
        </IconText>
        <IconText icon="code-fork" color="blue">
          {formatNumber(this.props.fork)} fork
        </IconText>
        <IconText icon="exclamation-triangle" color="red">
          {formatNumber(this.props.issue)} open Issue
        </IconText>
      </div>
    );
  }
}

const type = localStorage.getItem("type");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      type: type || "all",
      pages: {
        current: 1,
        total: 0,
      },
      typeList: ["all", "javascript", "ruby", "java", "css", "python"],
    };
  }

  componentDidMount() {
    this.getData(this.state.type);
    this.mountScrollEvent();
  }

  mountScrollEvent() {
    document.addEventListener("scroll", (e) => {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      console.log(scrollTop, clientHeight, scrollHeight);
      if (
        scrollHeight > clientHeight &&
        scrollTop + clientHeight === scrollHeight
      ) {
        this.getData(this.state.type, true);
      }
    });
  }

  getData(type, append = false) {
    if (
      this.state.pages.total &&
      this.state.pages.total <= this.state.pages.current * 30
    ) {
      return false;
    }
    this.setState({
      loading: true,
    });

    // reset query parasm
    const current = append ? this.state.pages.current + 1 : 1;

    getGithubInfo(type, current)
      .then((res) => {
        this.setState({
          list: append ? [...this.state.list, ...res.items] : res.items,
          type,
          loading: false,
          pages: {
            total: res.total_count,
            current,
          },
        });
      })
      .catch((e) => {
        this.setState({
          loading: false,
        });
        alert(e);
      });
  }

  handleTabChange(type) {
    // cache type
    localStorage.setItem("type", type);
    this.getData(type);
  }

  render() {
    const { list, typeList, type, loading } = this.state;
    return (
      <div>
        <Tab
          list={typeList}
          onChange={this.handleTabChange.bind(this)}
          select={type}
        />

        {loading && <Loading />}
        <div className="container">
          {list.length !== 0 &&
            list.map((item, index) => {
              return (
                <Card
                  key={`card-list-${index}`}
                  rank={index + 1}
                  avatar={item.owner.avatar_url}
                  name={item.name}
                  user={item.owner.login}
                  star={item.stargazers_count}
                  fork={item.forks}
                  issue={item.open_issues}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const app = document.querySelector("#root");
ReactDOM.render(React.createElement(App), app);
