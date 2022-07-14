import Part from './Part.js';

const Content = ({parts}) => {
    return (
      <>
        {parts.map(part =>
        <div key={part.id}> 
        <Part name={part.name} number={part.exercises} />
        </div>
        )}
      </>
    );
  };
  export default Content;