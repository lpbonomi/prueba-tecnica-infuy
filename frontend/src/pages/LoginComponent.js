import React from 'react'
import { EmailComponent } from '../EmailComponent'
import { ContraseñaComponent } from '../ContraseñaComponent'

export const LoginComponent = () => {
  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
          <div className="row justify-content-center">
              <div className="col-xxl-4 col-lg-5">
                  <div className="card ">
                      <div className="card-body p-4">
                        <form >
                            < EmailComponent />
                            <ContraseñaComponent es_confirmacion = {false}/>
                            <div className="d-grid gap-2 ">
                                <button className="btn btn-primary" type="submit" id="registro">Login</button>
                            </div>
                        </form >
                      </div>
                  </div>
              </div>
        </div>
    </div>
)
}
