function AccountReducer(account={
  isAuth: false, 
  name: null, 
  mobile: null, 
  email: null, 
  isEmailVerified: false, 
  isMobileVerified: false
}, action) {
  switch(action.type) {
    case 'AUTH':
      account = {
        isAuth: true, 
        name: action.data.name,
        mobile: action.data.mobile, 
        email: action.data.email
      }
      return account
    
    case 'LOGOUT':
      return account
      
    default:
      return account
  }
}

function ScreenReducer(screen=0,action) {
  switch(action.type) {
    case 'HOME':
      screen=0
      return screen
      
    case 'SEARCH':
      screen=1
      return screen
      
    case 'ACCOUNT':
      screen=2
      return screen
      
    case 'CART':
      screen=3
      return screen
      
    default:
      return screen
  }
}
function ProductReducer(products=[],action) {
  switch(action.type) {
    case 'ADD':
      products.push(action.data)
      return products
      
    case 'REMOVE':
      products.splice(action.data.index,1)
      return products
      
    case 'INCREMENT':
      products.forEach((item, index)=>{
        if(item.id == action.id) {
          products[index].count++
        }
      })
      return products
      
    case 'DECREMENT':
      products.forEach((item, index) => {
        if (item.id == action.id) {
          products[index].count--
        }
      })
      return products
      
    default:
      return products
  }
}

let Reducers = Redux.combineReducers({
  Product: ProductReducer, 
  Screen: ScreenReducer, 
  Account: AccountReducer
})

let store = Redux.createStore(Reducers)


function HomeScreen() {
  
  const [product, setProduct] = React.useState([])
  
  const [filter, setFilter] = React.useState([{
    name: "All Products", 
    enable: true
  }, {
    name: "Steamed Momo",
    enable: false
  }, {
    name: "Panfried Momo", 
    enable: false
  }, {
    name: "Butter Masala Momo", 
    enable: false
  }, {
    name: "Tandoori Momo", 
    enable: false
  }])
  
  const Filter = (filter_text) => {
    let NewFilter = filter.map((item, index) => {
      if (filter_text == item.name) {
        return {
          ...item,
          enable: true
        }
      } else {
        return {
          ...item,
          enable: false
        }
      }
      return item
    })
    let FilterProduct = []
    store.getState().Product.forEach((item, index) => {
      if (item.category === filter_text || filter_text === 'All Products' || filter_text === undefined) {
        FilterProduct.push(item)
      }
    })
    setFilter(NewFilter)
    setProduct(FilterProduct)
  }
  
  React.useEffect(()=>{
    store.subscribe(() => {
      let tmp_product = []
      store.getState().Product.forEach((item)=>{
        tmp_product.push(item)
      })
      setProduct(tmp_product)
      Filter()
    })
    Filter()
  }, [])
 
  return(
    <div className="screen">
    <div className="col-1-1 center">
      <div>{filter.map((item)=>
        <p key={item.name} className="title">{item.enable?item.name:null}</p>
      )}
      </div>
      <div>
       <select id="filter-value" onChange={(event)=>{
         Filter(event.target.value)
       }}>
        {filter.map((item)=>
          <option key={item.name}>{item.name}</option>
        )}
       </select>
      </div>
      <p className="description">Total {product.length} Products</p>
    </div>
    <div className="col-1-1">
      {product?product.map((item) =>
      <ProductCard Image="" Count={item.count} Name={item.name} Description={item.description} Price={item.price} Category={item.category} Id={item.id} key={item.id} />
      ):null}
    </div>
    </div>
  )
}

function SearchScreen() {
  
  const [result, setResult] = React.useState(null)
  
  
  const Search = ()=>{
    let searchResult = []
    store.getState().Product.forEach((item, index)=>{
      let exp = new RegExp(document.getElementById("search-text").value, "ig")
      if(item.name.search(exp)!=-1 || item.description.search(exp)!=-1 || item.category.search(exp)!=-1) {
        searchResult.push(item)
      }
    })
    setResult(searchResult)
  }
  
  React.useEffect(()=>{
    store.subscribe(()=>{
      Search()
    })
  }, [])
  
  return(
    <div className="screen block">
    
      <input type="text" placeholder="Enter Your Favourite Momo" id="search-text" onKeyUp={()=>Search()} />
      
      <div className="col-1-1">
        {result?result.map((item)=>
          <ProductCard Image="" Count={item.count} Name={item.name} Description={item.description} Price={item.price} Category={item.category} Id={item.id} key={item.id} />
        ):null}
      </div>
      
    </div>
  )
}

function AccountScreen() {
  
  const[isAuth, setAuth] = React.useState(true)
  const [isLogin, setLogin] = React.useState(true)
  const [account, setAccount] = React.useState(null)
  
  React.useEffect(()=>{
    store.subscribe(()=>{
      store.getState().Account.isAuth?setAccount(store.getState().Account):null
    })
  }, [])
  
  return(
    <div className="screen block">
      {isAuth?<AccountCard Name="Rajesh Mondal" Mobile="9123999737" Email="rajeshmondal9007@gmail.com" />:isLogin?<Login />:<SignUp />}
      <br /><br />
      {isAuth?null:<div>
      {isLogin?<p className="center">Don't have an account ?? <a onClick={()=>setLogin(false)}>Signup</a> now</p>:null}
      {isLogin?null:<p className="center">Don't have an account ?? <a onClick={()=>setLogin(true)}>Login</a> now</p>}
      </div>}
    </div>
  )
}

function App() {
  
  const [cart, setCart] = React.useState(0)
  const [screen, setScreen] = React.useState(store.getState().Screen)
  
  React.useEffect(()=>{
    store.subscribe(()=>{
      let count = 0
      store.getState().Product.forEach((item)=>{
        item.count > 0?count++:null
      })
      setCart(count)
      setScreen(store.getState().Screen)
    })
  }, [])
  
  return(
    <>
      <TopNavBar title="Only Momo's" address="Fultala 3No Gate, Piyali Town" cartCount={cart} />
      {screen==0?<HomeScreen />:screen==1?<SearchScreen />:screen==2?<AccountScreen />:null}
      <BottomNavBar />
    </>
  )
}

fetch('https://code-cheap-node.herokuapp.com/product/read').then((response)=>{
  if(response.ok) {
    response.json().then((data)=>{
      data.forEach((item)=>{
        store.dispatch({
          type: 'ADD',
          data: item
        })
      })
    })
  } else {
    console.log(response.statusText)
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

