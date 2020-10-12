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


function AccountCard({ Name, Mobile, Email }) {
  return(
    <div className="account-card block">
      <div className="logout-btn col-1-1 right">
        <ion-icon name="log-out-outline"></ion-icon>
        <p>Logout</p>
      </div>
      <img src="../images/Homepage_testi.png" alt="Account Avatar" className="center" />
      <br />
      <div className="col-1-3">
        <p className="title">Name:</p>
        <p className="">{Name}</p>
      </div>
      <div className="col-1-3">
        <p className="title">Mobile:</p>
        <p className="">{Mobile}</p>
      </div>
      <div className="col-1-3">
        <p className="title">Email:</p>
        <p className="">{Email}</p>
      </div>
    
    </div>
  )
}


function Login() {
  return(
    <div className="login block">
      <h2 className="center">Login</h2>
      <label><ion-icon name="person-circle-outline"></ion-icon>Username</label>
      <input type="number" placeholder="Enter Your Mobile No" />
      <label><ion-icon name="key-outline"></ion-icon>Password</label>
      <input type="password" placeholder="•••••••••" />
      <button>Login</button>
    </div>
  )
}

function SignUp() {
  return(
    <div className="login block">
      <h2 className="center">SignUp</h2>
      <label><ion-icon name="person-circle-outline"></ion-icon>Name</label>
      <input type="text" placeholder="Enter Your Name" />
      <label><ion-icon name="call-outline"></ion-icon>Mobile</label>
      <input type="number" placeholder="Enter Your Mobile No" />
      <label><ion-icon name="mail-outline"></ion-icon>Email</label>
      <input type="email" placeholder="Enter Your Email" />
      <label><ion-icon name="key-outline"></ion-icon>Password</label>
      <input type="password" placeholder="•••••••••" />
      <button className="danger">Create Account</button>
    </div>
  )
}