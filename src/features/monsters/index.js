import { connect } from 'react-redux';

function Monsters(props) {
  const { monsters } = props;

  return ( monsters.components );
}

const mapStateToProps = ({ monsters }) => {
  return { monsters };
}

export default connect(mapStateToProps)(Monsters);
