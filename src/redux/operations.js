import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// взагалі цей файл треба для того, щоб тут створити певні операції, а також обробки цих операцій

// в даному випадку треба створити "сховище" всіх контактів
// додавання контаків
// видалення контактів

// використовуємо бібліотеку axios, бо це є одна з найкращих бібліотек JS i Raect
// для подачі запитання HTTP
const client = axios.create({
  baseURL: 'https://6396262c90ac47c6807edb6f.mockapi.io',
});

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  // Wykorzystamy symbol podkreślenia jako nazwę pierwszego parametru,
  // ponieważ w tej operacji nie jest nam potrzebny
  async (_, thunkAPI) => {
    try {
      const response = await client.get('/contacts');
      // Przy pomyślnym zapytaniu zwracamy promise z danymi
      return response.data;
    } catch (error) {
      // Przy błędzie zapytania zwracamy promise,
      // który zostanie odrzucony z tekstem błędu
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      // const response = await axios.get('/contacts');
      // return response.data;
      const { name, number } = newContact;
      const response = await client.post('/contacts', {
        name: name,
        number: number,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteTask',
  async (contactId, thunkAPI) => {
    try {
      const response = await client.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
//   try {
//     dispatch(fetchingInProgress());

//     const response = await axios.get('/contacts');
//     dispatch(fetchingSuccess(response.data));
//   } catch (e) {
//     dispatch(fetchingError(e.message));
//   }
