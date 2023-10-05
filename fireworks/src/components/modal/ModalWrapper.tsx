import React, {FC, useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SCREEN_HEIGHT} from '../../common/infra/infra.consts';
import {mainColors} from '../../common/themes/colors';
import {useFireStore} from '../../state/store';
import {Transaction} from '../../state/store.types';
import {TransactionType} from '../../types/common.types';
import {Expense} from './Expense';

interface ModalWrapperProps {
  //transactionType?: TransactionType;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({}: ModalWrapperProps) => {
  const {account, addTransaction, editTransaction, setTransactionToEdit, transactionToEdit, isModalOpened, closeModal} = useFireStore(state => state) ?? {};
  const [transactionType, setTransactionType] = useState<TransactionType>('adding');

  useEffect(() => {
    if (isModalOpened) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [isModalOpened]);

  useEffect(() => {
    setTransactionType(transactionToEdit ? 'editing' : 'adding');
  }, [transactionToEdit]);

  const refRBSheet = useRef<RBSheet | null>(null);

  const onButtonPressedCB = (currentTransaction: Transaction): void => {
    if (transactionType === 'adding') {
      addTransaction(account?.name, currentTransaction);
    } else {
      editTransaction(account?.name, currentTransaction);
    }
    onModalClosing();
  };

  const onModalClosing = (): void => {
    setTransactionToEdit(undefined);
    closeModal();
  };
  return (
    <RBSheet
      ref={refRBSheet}
      height={SCREEN_HEIGHT * 0.92}
      closeOnDragDown
      closeOnPressMask={false}
      keyboardAvoidingViewEnabled
      onClose={onModalClosing}
      customStyles={{
        wrapper: {
          //backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: mainColors.GRAY_DARK,
        },
      }}>
      <Expense transactionType={transactionToEdit ? 'editing' : 'adding'} transaction={transactionToEdit} onButtonPressed={onButtonPressedCB} />
    </RBSheet>
  );
};
