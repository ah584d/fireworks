import React, {ReactElement, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import RBSheet from '@lunalee/react-native-raw-bottom-sheet';
import {SCREEN_HEIGHT} from '../../common/infra/infra.consts';
import {mainColors} from '../../common/themes/colors';
import {Spacing} from '../../common/themes/spacing';
import {useFireStore} from '../../state/store';
import {Transaction} from '../../types/store.types';
import {CloseButton} from '../buttons/CloseButton';
import {Expense} from './ExpenseForm';

export const ModalWrapper = (): ReactElement => {
  const {
    account,
    addTransaction,
    editTransaction,
    setTransactionToEdit,
    transactionToEdit,
    deleteTransaction,
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

  const modalHeight = transactionType === 'filter' ? SCREEN_HEIGHT * 0.7 : SCREEN_HEIGHT * 0.92;

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
        filterTransactions(currentTransaction);
        break;
      }
      default:
        addTransaction(account?.name, currentTransaction);
        break;
    }
    onModalClosing();
  };

  const onDeleteButtonPressedCB = (transactionId: number): void => {
    deleteTransaction(account?.name, transactionId);
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
      height={modalHeight}
      closeOnDragDown={true}
      closeOnPressMask={false}
      keyboardAvoidingViewEnabled
      onClose={onModalClosing}
      customStyles={{
        container: {
          borderRadius: 15,
        },
        draggableIcon: {
          backgroundColor: mainColors.GRAY_DARK,
        },
      }}>
      <View style={styles.closeButton}>
        <CloseButton action={onModalClosing} />
      </View>
      <Expense
        transactionType={transactionType}
        transaction={transactionToEdit}
        onButtonPressed={onButtonPressedCB}
        onDeleteButtonPressed={onDeleteButtonPressedCB}
      />
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'flex-end',
    marginRight: Spacing.s16,
  },
});
