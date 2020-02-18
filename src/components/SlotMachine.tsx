import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

import styles, { itemSize } from '../styles/SlotMachine.style';

const datas = [...new Array(9)].map((_, index) => ({
  id: index,
  name: `Item-${index + 1}`,
}));

type Props = WithStylesProps<typeof styles>;

class SlotMachine extends React.Component<Props> {
  private itemWrapperRef1: React.RefObject<HTMLDivElement>;

  private itemWrapperRef2: React.RefObject<HTMLDivElement>;

  private itemWrapperRef3: React.RefObject<HTMLDivElement>;

  private timerInterval1?: number;

  private timerInterval2?: number;

  private timerInterval3?: number;

  constructor(props: Props) {
    super(props);
    this.itemWrapperRef1 = React.createRef<HTMLDivElement>();
    this.itemWrapperRef2 = React.createRef<HTMLDivElement>();
    this.itemWrapperRef3 = React.createRef<HTMLDivElement>();
  }

  handlePlay = () => {
    window.clearInterval(this.timerInterval1);
    window.clearInterval(this.timerInterval2);
    window.clearInterval(this.timerInterval3);

    if (
      this.itemWrapperRef1.current &&
      this.itemWrapperRef2.current &&
      this.itemWrapperRef3.current
    ) {
      // 動畫前先到隨機位置開始
      const block1 = this.itemWrapperRef1.current;
      const block2 = this.itemWrapperRef2.current;
      const block3 = this.itemWrapperRef3.current;
      block1.style.top = '0px';
      block2.style.top = `${itemSize * -1}px`;
      block3.style.top = `${itemSize * -2}px`;

      const finalIndex1 = Math.floor(Math.random() * datas.length);
      const finalIndex2 = Math.floor(Math.random() * datas.length);
      const finalIndex3 = Math.floor(Math.random() * datas.length);
      const finalIndex = [finalIndex1, finalIndex2, finalIndex3];

      this.handleAnimation(block1, 3000, finalIndex[0], datas.length, this.timerInterval1);
      this.handleAnimation(block2, 3500, finalIndex[1], datas.length, this.timerInterval2);
      this.handleAnimation(block3, 4000, finalIndex[2], datas.length, this.timerInterval3);
    }
  };

  handleAnimation = (
    block: HTMLDivElement,
    time: number,
    finalIndex: number,
    listLength: number,
    timerInterval?: number,
  ) => {
    /* eslint-disable no-param-reassign */
    window.clearInterval(timerInterval);
    block.style.filter = 'blur(1px)';
    block.style.webkitFilter = 'blur(1px)';
    block.style.transition = 'top 0.1s ease-in-out';

    const stepDif = itemSize / 10;
    const maxHeight = itemSize * listLength * -1;
    const maxStepDif = itemSize * (listLength / 2);
    let dif = stepDif;
    let difOperator = -1;

    timerInterval = window.setInterval(() => {
      const { offsetTop } = block;
      let finalTop = offsetTop + dif * difOperator;
      if (finalTop > 0) {
        difOperator *= -1;
        finalTop = offsetTop + dif * difOperator;
      } else if (finalTop < maxHeight) {
        difOperator *= -1;
        finalTop = offsetTop + dif * difOperator;
      }
      block.style.top = `${finalTop}px`;
      if (dif < maxStepDif) dif += stepDif;
    }, 100);

    window.setTimeout(() => {
      block.style.filter = 'none';
      block.style.webkitFilter = 'none';
      block.style.transition = 'top 1s ease-in-out';
      clearInterval(timerInterval);
      block.style.top = `${finalIndex * itemSize * -1}px`;
    }, time);
    /* eslint-enable no-param-reassign */
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.contentWrapper}>
          <div className={classes.blockWrapper}>
            <div className={classes.itemWrapper} ref={this.itemWrapperRef1}>
              {datas.map((item) => (
                <div key={item.id} className={classes.item}>
                  <span className={classes.itemTxtName}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.blockWrapper}>
            <div className={classes.itemWrapper} ref={this.itemWrapperRef2}>
              {datas.map((item) => (
                <div key={item.id} className={classes.item}>
                  <span className={classes.itemTxtName}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.blockWrapper}>
            <div className={classes.itemWrapper} ref={this.itemWrapperRef3}>
              {datas.map((item) => (
                <div key={item.id} className={classes.item}>
                  <span className={classes.itemTxtName}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="button" className={classes.btnPlay} onClick={this.handlePlay}>
          Play
        </button>
      </div>
    );
  }
}

export default withStyles(styles)(SlotMachine);
