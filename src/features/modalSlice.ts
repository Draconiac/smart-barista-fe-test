import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalProps {
  isOpen: boolean;
}

const initialState: ModalProps = { isOpen: false };
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal(state, action: PayloadAction<React.ReactNode | null>) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
