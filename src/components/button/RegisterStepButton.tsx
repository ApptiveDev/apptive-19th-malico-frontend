import {useSelector} from 'react-redux';
import {RootState} from '@/modules';
import Button from '@components/button/Button.tsx';
import {getRequiredInfo} from '@modules/registerReducer.ts';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Constants from '@/constants';

type RegisterStepButtonProps = {
  currentProgress: number;
};

const RegisterStepButton = ({currentProgress}: RegisterStepButtonProps) => {
  const navigate = useNavigate();
  const registerState =
    useSelector((state: RootState) => state.register);
  const [disabled, setDisabled] = useState(true);

  const constant = Constants.register;
  useEffect(() => {
    const requiredInfo = getRequiredInfo(currentProgress);
    let disabledChange = false;
    for (const key of requiredInfo) {
      if (typeof registerState[key] === 'undefined' || registerState[key] === null) {
        disabledChange = true;
      }
    }
    setDisabled(disabledChange);
  }, [currentProgress, registerState]);
  return <Button label={'다음'} disabled={disabled} onClick={() =>{
    navigate(constant.getNextUrlHash(currentProgress));
  }}/>;
};
export default RegisterStepButton;
