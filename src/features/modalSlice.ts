import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalProps {
  isOpen: boolean;
  content: React.ReactNode | null;
}

const initialState: ModalProps = { isOpen: false, content: null };
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal(state, action: PayloadAction<React.ReactNode | null>) {
    
      state.isOpen = true;
      state.content = action.payload || null; // Ensure content is never undefined
    },
    closeModal(state) {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
