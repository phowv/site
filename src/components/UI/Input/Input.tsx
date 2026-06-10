import classes from './Input.module.css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = (props: InputProps) => {
  return (
    <input className={classes.input} {...props}/>
  );
}

export default Input;
