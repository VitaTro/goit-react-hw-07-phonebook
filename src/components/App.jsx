import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

import { fetchContacts } from '../redux/operations';
import { getError, getIsLoading } from '../redux/state';
import Filter from './Filter/Filter';
import { Loader } from './Loader/Loader';
import background from './img/apple.jpeg';

// const Key = 'Contacts';

export const App = () => {
  // const contacts = useSelector(getContacts);
  // const isMounted = useRef(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    //   if (isMounted.current) {
    //     localStorage.setItem(Key, JSON.stringify(contacts));
    //   } else {
    //     isMounted.current = true;
    //   }
    // }, [contacts]
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          padding: 20,
          color: '#fff',
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        {isLoading && !error && <Loader />}
        <ContactList />
      </div>
    </>
  );
};
