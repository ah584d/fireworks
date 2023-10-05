import React, {FC, useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SCREEN_HEIGHT} from '../../common/infra/infra.consts';
import {mainColors} from '../../common/themes/colors';
import {useFireStore} from '../../state/store';
import {Transaction} from '../../types/store.types';
import {Expense} from './Expense';

interface ModalWrapperProps {}

export const ModalWrapper: FC<ModalWrapperProps> = ({}) => {
  const {
    account,
    addTransaction,
    editTransaction,
    setTransactionToEdit,
    transactionToEdit,
    isModalOpened,
    closeModal,
    transactionType,
    setTransactionType,
    filterTransactions,
  } = useFireStore(state => state) ?? {};

  useEffect(() => {
    if (isModalOpened) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [isModalOpened]);

  const refRBSheet = useRef<RBSheet | null>(null);

  const onButtonPressedCB = (currentTransaction: Transaction): void => {
    switch (transactionType) {
      case 'adding': {
        addTransaction(account?.name, currentTransaction);
        break;
      }
      case 'editing': {
        editTransaction(account?.name, currentTransaction);
        break;
      }
      case 'filter': {
        console.log(`====> DEBUG filter: `, currentTransaction);
        filterTransactions(currentTransaction);
        break;
      }
      default:
        break;
    }
    onModalClosing();
  };

  const onModalClosing = (): void => {
    setTransactionToEdit(undefined);
    setTransactionType(undefined);
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
      <Expense transactionType={transactionType} transaction={transactionToEdit} onButtonPressed={onButtonPressedCB} />
    </RBSheet>
  );
};
