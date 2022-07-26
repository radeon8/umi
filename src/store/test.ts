import { getDetail } from '@/api';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './index';

export const slice = createSlice({
  name: 'test',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// 外部的 thunk creator 函数
export const incrementAsync = (amount: number) => {
  // 内部的 thunk 函数
  return (dispatch: AppDispatch) => {
    // thunk 内发起异步数据请求
    getDetail().then((res: any) => {
      console.log(res);
      // 但数据响应完成后 dispatch 一个 action
      dispatch(incrementByAmount(amount));
    });
  };
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.test.value)`
export const selectCount = (state: RootState) => state.test.value;

export default slice.reducer;
