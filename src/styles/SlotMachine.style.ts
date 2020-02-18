import { Styles } from 'react-jss';

const itemSize = 80;
const blockMargin = 10;
const styles = {
  wrapper: {
    position: 'relative',
    margin: '30px auto',
    '@media screen and (max-height: 640px)': {
      margin: '10px auto',
    },
  },
  contentWrapper: {
    position: 'relative',
    width: itemSize * 3 + blockMargin * 2,
    height: itemSize,
    display: 'flex',
    justifyContent: 'space-around',
    margin: 'auto',
  },
  blockWrapper: {
    position: 'relative',
    width: itemSize,
    height: itemSize,
    backgroundColor: 'white',
    border: 'solid 1px black',
    overflow: 'hidden',
  },
  itemWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: itemSize,
  },
  item: {
    position: 'relative',
    width: itemSize,
    height: itemSize,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTxtName: {
    fontSize: 22,
    fontWeight: 'bolder',
    color: 'yellow',
    textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
  },
  btnPlay: {
    width: 80,
    height: 40,
    margin: blockMargin,
    fontSize: 25,
    fontWeight: 'bolder',
    color: '#ffffff',
    backgroundColor: '#1c6ea4',
  },
};

export { itemSize };
export default styles as Styles<keyof typeof styles>;
