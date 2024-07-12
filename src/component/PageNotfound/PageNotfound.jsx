import React from 'react'
import './pagenotfound.css'
import { useHistory } from "react-router-dom";
import MetaData from "../../MetaData";

function PageNotfound() {
  const history = useHistory();
  const handleLogoClick = () => {

    history.push("/")
    
  };
  return (
    <>
    <MetaData title="Page not found" />
       <div>
         {/* <div class="perspective-text">
      <div class="perspective-line">
        <p></p>
        <p>Reality</p>
      </div>
      <div class="perspective-line">
        <p>Reality</p>
        <p>Is Only</p>
      </div>
      <div class="perspective-line">
        <p>Is Only</p>
        <p>A Matter Of</p>
      </div>
      <div class="perspective-line">
        <p>A Matter Of</p>
        <p>Perception</p>
      </div>
      <div class="perspective-line">
        <p>Perception</p>
        <p></p>
      </div>
    </div> */}
      {/* <p class="cloud-text cloud-title">Moving Cloud Text</p> */}

      <div class="main_wrapper">
    <div class="main">
      <div class="antenna">
        <div class="antenna_shadow"></div>
        <div class="a1"></div>
        <div class="a1d"></div>
        <div class="a2"></div>
        <div class="a2d"></div>
        <div class="a_base"></div>
      </div>
      <div class="tv">
        <div class="cruve">
          <svg
            
            viewBox="0 0 189.929 189.929"
           
            version="1.1"
            class="curve_svg"
          >
            <path
              d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
          C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
            ></path>
          </svg>
        </div>
        <div class="display_div" onClick={()=> handleLogoClick()}>
          <div class="screen_out">
            <div class="screen_out1">
              <div class="screen">
                <span class="notfound_text">Page Not Found</span>
              </div>
            </div>
          </div>
        </div>
        <div class="lines">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <div class="buttons_div">
          <div class="b1"><div></div></div>
          <div class="b2"></div>
          <div class="speakers">
            <div class="g1">
              <div class="g11"></div>
              <div class="g12"></div>
              <div class="g13"></div>
            </div>
            <div class="g"></div>
            <div class="g"></div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="base1"></div>
        <div class="base2"></div>
        <div class="base3"></div>
      </div>
    </div>
    <div class="text_404">
      <div class="text_4041">4</div>
      <div class="text_4042">0</div>
      <div class="text_4043">4</div>
    </div>
  </div>
  </div>
    </>
   
  )
}

export default PageNotfound