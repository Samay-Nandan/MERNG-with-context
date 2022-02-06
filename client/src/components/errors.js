const errorHandler = (props) => {

   const { errors, message } = props

   return ( 
        <div className="ui error message">
            <ul className="list">
            {
               errors && Object.values(errors).map(value => ( <li key={value}> {value} </li> )) 
            }
            {
               message && <li>{message}</li>
            }
            </ul>
        </div> 
  )
};

export default errorHandler;
