import React       from 'react';
import { connect } from 'react-redux';

import Button      from '../../../../components/button';
import Dialog      from '../../../../components/dialog';
import closeDialog from '../../actions/close-dialog';

import './styles.scss';

const GameTextDialog = ({ text1, text2, closeDialog }) => {

  return(
    <Dialog onKeyPress={closeDialog}>

      <div className='flex-column game-text-dialog__container'>

        <span className='game-text-dialog__text'>
          { text1 || '' }
        </span>

        <span className='game-text-dialog__text'>
          { text2 || '' }
        </span>

        <div className='game-text-dialog__button'>
          <Button
            onClick={closeDialog}
            title='Continue' />
        </div>
      </div>

    </Dialog>
  );
};

const actions = { closeDialog };

export default connect(null, actions)(GameTextDialog);