function TopNavBar({ title, address, cartCount }) {
  return(
    <div className="top-nav-bar">
      <h3>{title}</h3>
      <div className="col-4-1">
        <div>{address}</div>
        <div className="center col-1-1"><ion-icon name="cart-outline" ></ion-icon><p className="badge">{cartCount}</p></div>
      </div>
    </div>
  )
}

function BottomNavBar() {
  return(
    <div className="bottom-nav-bar">
      <div onClick={()=>store.dispatch({
        type: 'HOME'
      })}><ion-icon name="home-outline" ></ion-icon></div>
      <div onClick={()=>store.dispatch({
        type: 'SEARCH'
      })}><ion-icon name="search-outline"></ion-icon></div>
      <div onClick={()=>store.dispatch({
        type: 'ACCOUNT'
      })}><ion-icon name="person-circle-outline"></ion-icon></div>
    </div>
  )
}

function ProductCard({ Image, Name, Description, Price, Count, Category, Id }) {
  return(
    <div className="product-card">
      <img src="../images/ic_preview.jpeg" alt="preview" />
      <p className="title">{Name}</p>
      <p className="description">{Description}</p>
      <p className="category">{Category}</p>
      <br />
      <div className="col-1-2">
        <p className="price">&#8377;&nbsp;{Price}</p>
        {Count==0?<button onClick={()=>store.dispatch({
          type: 'INCREMENT',
          id: Id
        })}>ADD</button>:<div className="col-1-1-1">
          <ion-icon name="remove-circle-outline" onClick={()=>store.dispatch({
            type: 'DECREMENT', 
            id: Id
          })}></ion-icon>
          <p>{Count}</p>
          <ion-icon name="add-circle-outline" onClick={()=>store.dispatch({
            type: 'INCREMENT', 
            id: Id
          })}></ion-icon>
        </div>}
      </div>
    </div>
  )
}


function AccountCard() {
  return(
    <div>
      Account Details
    </div>
  )
}


function Login() {
  return(
    <div className="">
      Login
    </div>
  )
}

function SignUp() {
  return(
    <div className="">
      SignUp
    </div>
  )
}