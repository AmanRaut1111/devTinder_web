import React from "react";

const UserCard = ({ user }) => {
  console.log(user);

  const { firstName, lastName, age, gender, about } = user;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
     
        {about &&  <p>{about}</p>}
        <div className="card-actions justify-center my-4">
          <button className="btn btn-success">Interested</button>
          <button className="btn btn-error">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
