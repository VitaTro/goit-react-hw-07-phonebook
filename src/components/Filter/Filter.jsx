import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const changeHandler = e => {
    const filterValue = e.target.value;
    dispatch(setFilter(filterValue));
  };

  return (
    <div>
      <span>Find contacts by name</span>
      <input type="text" name="filter" onChange={changeHandler}></input>
    </div>
  );
};

export default Filter;
