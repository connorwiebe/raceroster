import React from 'react'
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-map-react'
import './index.css'

const App = () => {

  const key = 'AIzaSyAGdkvExo-NnxjX4EnFYjELDccEOvmkHzY'
  const coords = {lat: 42.981701, lng: -81.251404}
  const [form, setForm] = React.useState({
    first: '', last: '', email: '', number: '',
    errors: { first: '', last: '', email: '', number: '' }
  })

  // eslint-disable-next-line
  const regex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
  const submit = e => {
    e.preventDefault()
    setForm(prev => {
      Object.keys(prev).forEach(name => {
        const value = prev[name]
        switch (name) {
          case 'first':
            prev.errors.first = !value ? 'First name is required' : ''
            break
          case 'last':
            prev.errors.last = !value ? 'Last name is required' : ''
            break
          case 'email':
            if (!value) {
              prev.errors.email = 'Email is required'
            } else if (!regex.test(value)) {
              prev.errors.email = 'Expected email format: example@example.com'
            } else {
              prev.errors.email = ''
            }
            break
          case 'number':
            if (!value) {
              prev.errors.number = 'Phone number is required'
            } else if (isNaN(+value)) {
              prev.errors.number = 'Phone number must be only numbers'
            } else {
              prev.errors.number = ''
            }
            break
          default:
            break
        }
      })
      return {...prev}
    })


    const hasErrors = Object.keys(form.errors).filter(key => form.errors[key]).length
    if (hasErrors) return

    // do stuff
  }

  const change = e => {
    const { name, value } = e.target
    setForm(prev => {
      prev[name] = value
      return prev
    })
  }

  const marker = (map, maps) => {
    const marker = new maps.Marker({
      position: coords,
      map,
    })
    return marker
  }

  return (

    <React.Fragment>
      {/* Navigation */}
      <nav className="Navigation">
        <div className="Navigation__content">
          <a href="/" className="Logo">
            <img className="Image" src="./generic-logo.png" alt="Generic Logo"/>
          </a>
          <div className="Menu">
            <a href="/" className="Button Button--md Menu__login">Log-In</a>
            <a href="/" className="Button Button--md Menu__signup">Sign Up</a>
          </div>
        </div>
      </nav>

      <div className="Wrapper">
        <div className="Containers">

          {/* Hero */}
          <div className="Container Hero">
            <div className="Hero__content">
              <h1 className="">Make event management a breeze</h1>
              <p className="Hero__subtitle">ACME Events Inc. makes making beautiful event landing pages a DIY adventure.</p>
              <button className="Hero__button Button Button--lg">Book A Demo</button>
            </div>
          </div>

          {/* Info */}
          <div className="Container Info">
            <div className="Info__content">
              <div className="Info__image">
                <img className="" src="./heart-lamps.png" alt="Heart Lamps"/>
              </div>
              <div className="Info__body">
                <h2 className="Info__title">Make your ticket holders happy</h2>
                <p>A beautiful little sunset. Talent is a pursued interest. That is to say, anything you practice you can do. This is probably the greatest thing that's ever happened in my life. These things happen automatically. All you have to do is just let them happen.</p>
                <br/>
                <p>Just let go - and fall like a little waterfall. Nothing's gonna make your husband or wife madder than coming home and having a snow-covered dinner. Just pretend you are a whisper floating across a mountain. Zip. That easy.</p>
                <br/>
                <a href="/" className="Link">View full feature column</a>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="Container Video">
            <div className="Video__content">
              <iframe
                title="asdf"
                height="350"
                src="https://www.youtube.com/embed/QH2-TGUlwu4"
                frameBorder="0"
                allowFullScreen>
              </iframe>
            </div>
          </div>

          {/* Demo */}
          <div className="Container Demo">
            <div className="Demo__content">
              <h2 className="Demo__title">Book a demo</h2>
              <div className="Demo__body">
                <form className="Demo__form" action="post" onSubmit={submit} noValidate>

                  { !!Object.keys(form.errors).filter(key => form.errors[key]).length &&
                    <div className="form__error"><span>HEADS UP!</span>&nbsp;There are errors in the form below.</div>
                  }

                  <div className="Demo__group">
                    <label className="Demo__label" htmlFor="first">First name <span>*</span></label>
                    <input className={`Demo__input ${form.errors.first ? 'form__error--input' : ''}`} onChange={change} name="first" type="text"/>
                    { form.errors.first && <small>{form.errors.first}</small> }
                  </div>

                  <div className="Demo__group">
                    <label className="Demo__label" htmlFor="last">Last name <span>*</span></label>
                    <input className={`Demo__input ${form.errors.last ? 'form__error--input' : ''}`} onChange={change} name="last" type="text"/>
                    { form.errors.last && <small>{form.errors.last}</small> }
                  </div>

                  <div className="Demo__group">
                    <label className="Demo__label" htmlFor="email">Email <span>*</span></label>
                    <input className={`Demo__input ${form.errors.email ? 'form__error--input' : ''}`} onChange={change} name="email" type="email"/>
                    { form.errors.email && <small>{form.errors.email}</small> }
                  </div>

                  <div className="Demo__group">
                    <label className="Demo__label" htmlFor="number">Phone number <span>*</span></label>
                    <input className={`Demo__input ${form.errors.number ? 'form__error--input' : ''}`} onChange={change} name="number" type="tel"/>
                    { form.errors.number && <small>{form.errors.number}</small> }
                  </div>

                  <input className="Demo__submit" type="submit" value="Sign Up"/>
                </form>
                <div className="Demo__image">
                  <img className="" src="./event-picture.png" alt="Event"/>
                </div>
              </div>
            </div>
          </div>

          {/* Colophon */}
          <div className="Container Colophon">
            <div className="Colophon__content">
              <div className="Colophon__columns">
                <ul className="Colophon__column">
                  <li className="column__title">Features</li>
                  <li className="column__item"><a href="/">Event organizer tools</a></li>
                  <li className="column__item"><a href="/">Timer tools</a></li>
                  <li className="column__item"><a href="/">Charity co-ordinator tools</a></li>
                  <li className="column__item"><a href="/">Participant experience</a></li>
                </ul>
                <ul className="Colophon__column">
                  <li className="column__title">Tools</li>
                  <li className="column__item"><a href="/">Dashboard maker</a></li>
                  <li className="column__item"><a href="/">Data & analytics</a></li>
                  <li className="column__item"><a href="/">Email marketing tool</a></li>
                  <li className="column__item"><a href="/">Social promotion tool</a></li>
                </ul>
                <ul className="Colophon__column">
                  <li className="column__title">Contact</li>
                  <li className="column__item">
                    <i className="fas fa-phone-alt"></i>
                    <a href="/">1-888-555-5555</a>
                  </li>
                  <li className="column__item">
                    <i className="fas fa-envelope"></i>
                    <a href="/">example@example.com</a>
                  </li>
                  <li className="column__item">
                    <i className="fas fa-map-marker-alt"></i>
                    <a href="/">123 Fake Street, London, ON A1B 2C3</a>
                  </li>
                </ul>
                <ul className="Colophon__column">
                  <li>
                    <div className="Colophon__map">
                      <GoogleMapReact
                        bootstrapURLKeys={{key}}
                        center={coords}
                        defaultZoom={13}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => marker(map, maps)}>
                      </GoogleMapReact>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="Footer">
          <div className="Footer__content">
            <div className="copyright">{`© Copyright Acme Inc. [${new Date().getFullYear()}]`}</div>
            <div className="social">
              <i className="fab fa-facebook-square"></i>
              <i className="fab fa-twitter-square"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </footer>

      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<App/>,document.getElementById('root'))
