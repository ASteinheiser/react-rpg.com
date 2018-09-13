import { connect } from 'react-redux';

function Monsters(props) {
  const { monsters } = props;

  let components = [];

  Object.keys(monsters.components).forEach(uuid => {
    components.push(monsters.components[uuid]);
  });

  return ( components );
}

const mapStateToProps = ({ monsters }) => {
  return { monsters };
}

export default connect(mapStateToProps)(Monsters);
