export const StarRating = ({rating, setRating, hover, setHover}) => {

    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "star on" : "star off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star-rate"><i class="fas fa-star"></i></span>
            </button>
          );
        })}
      </div>
    );
  };