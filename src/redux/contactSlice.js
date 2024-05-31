import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';
// const contactsInitialState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };

// if (localStorage.getItem('Contacts')) {
//   const savedContacts = JSON.parse(localStorage.getItem('Contacts'));
//   contactsInitialState = [...savedContacts];
// }

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  // це стара версія, вона не така читабельна, як нова
  // reducers: {
  // addContact: {
  //   reducer(state, action) {
  //     state.push(action.payload);
  //   },
  //   prepare(name, number) {
  //     return {
  //       payload: {
  //         name,
  //         number,
  //         id: nanoid(),
  //       },
  //     };
  //   },
  // },
  // deleteContact(state, action) {
  //   const index = state.findIndex(contact => contact.id === action.payload);
  //   state.splice(index, 1);
  // },

  // тепер замість зберігання даних у додатку,я запускаю код, який буде сам опрацьовувати в бекенді 3 ситуації:
  // 1) встановлення лоадера (значок завантаження, або напис)
  //     fetchingInProgress(state) {
  //       state.isLoading = true;
  //     },
  //     // 2) що має відбутись, якщо бекенд повертає успіх
  //     fetchingSuccess(state, action) {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.items = action.payload;
  //     },
  //     // 3) якщо повертає помилку
  //     fetchingError(state, action) {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     },
  //   },

  extraReducers: builder => {
    builder
      // показати контакти
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // додати контакт
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // видалити контакт
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
