import React, { Component } from 'react';
import logo from './logo.svg';
import './App.less';
const TIME = 50;
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      level: 2,
      isBegin: false,
      time: TIME,
      color: null,
      differentColor: null,
      differentIndex: 0,
      isFirst: true
    }
  }

  /**
   * @name begin 开始游戏
   * @todo 1.开始时间倒计时，2随机产生一个 不同色块的位置，初始化颜色
   */
  begin = () => {
    const { level } = this.state;

    this.timer = setInterval(() => {
      if (this.state.time <= 0) {
        this.gameOver()
        clearInterval(this.timer)
      }
      this.setState({
        time: this.state.time - 1
      })
    }, 1000);
    this.changeColor();
    this.setState({
      isBegin: true,
      differentIndex: Math.floor(Math.random() * level * level)
    })
  }
  /**
   * @name gameOver 结束
   */
  gameOver = () => {
    this.setState({
      isBegin: false,
      isFirst: false,
      time: TIME,
      level: 2
    })
  }
  /**
   * @name toNextLevel 通过下一关
   * @todo 1 产生随机位置，改变颜色
   */
  toNextLevel = () => {
    let nextLevel = this.state.level + 1;
    this.setState({
      level: nextLevel,
      differentIndex: Math.floor(Math.random() * nextLevel * nextLevel)
    })
    this.changeColor();
  }

  /**
   * @name changeColor 改变颜色
   */
  changeColor = () => {
    let random = Math.floor(Math.random() * 0xffffff);
    let color = '#' + random.toString(16);
    let differentColor = '#' + (random > 16 ? (random - 16) : (random + 16)).toString(16);
    this.setState({
      color,
      differentColor
    })
  }


  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  render() {
    const { level, isBegin, time, color, differentColor, differentIndex, isFirst } = this.state;
    return (
      <div className={"warpper"}>
        <h1>找出所有色块里颜色不同的一个 </h1>
        <h1>Click on the block that has a different color</h1>
        {
          isBegin && <h1>level:<span>{level - 1}</span> time:<span>{time}</span></h1>
        }
        {
          !isFirst && <h1>恭喜您通过{level - 1}关</h1>
        }
        {
          isBegin ? <div className="colorBox">
            {
              (() => {
                let width = (100 / level) + '%';
                let height = (100 / level) + '%';

                return new Array(this.state.level).fill(1).map((item, rowIndex) => <div className="row" style={{ height, }}>
                  {
                    (() => {

                      return new Array(this.state.level).fill(1).map((item, colIndex) => {
                        let backgroundColor = rowIndex * level + colIndex === differentIndex ? differentColor : color;
                        let onClick = rowIndex * level + colIndex === differentIndex ? this.toNextLevel : null;
                        return <div className="col" style={{ width, backgroundColor }} onClick={onClick}></div>
                      })
                    })()
                  }
                </div>)
              })()
            }
          </div> : <div className="beginBtn" onClick={this.begin}> {isFirst ? "Let's begin" : "Try again"}</div>
        }

      </div>
    );
  }
}

export default App;
