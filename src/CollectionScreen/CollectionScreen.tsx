import React, { useState, useEffect, useRef, useMemo } from 'react';
import CustomBtn from '../Components/CustomBtn';
import {data} from '../data';
import {gsap} from 'gsap';
import {FaGithub, FaYoutube} from 'react-icons/fa'


function CollectionScreen() {
    
    const smallImgRef = useRef<HTMLImageElement>(null);
    const imageBoxRef = useRef<HTMLDivElement>(null);

    const rightImgRef = useRef<HTMLImageElement>(null);
    const rightBgRef = useRef<HTMLDivElement>(null);

    const titreRef = useRef<HTMLHeadingElement>(null);
    const sousTitreRef = useRef<HTMLParagraphElement>(null);

    const [sliderPos, setSliderPos] = useState<number>(0);
    const t1 = useMemo(()=>gsap.timeline(),[]);
    const t2 = useMemo(()=>gsap.timeline(),[]);
    const t3 = useMemo(()=>gsap.timeline(),[]);
    const t4 = useMemo(()=>gsap.timeline(),[]);
    
    let manageClick = (num: number) => {
        let newPos = 0;
        if ((sliderPos+num)<0) { newPos = data.length-1 ;}
        else if ((sliderPos+num)>(data.length-1)) { newPos = 0 ;}
        else {newPos = sliderPos+num;}

        if(!t2.isActive()&&!t3.isActive()){
            t1.clear();
            t1.to(smallImgRef.current, {
                duration:0,
                transform: 'translateY(2rem)',
                clipPath: 'polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%)'
            })
            .to(smallImgRef.current, {
                duration:0,
                delay:0.4,
                transform: 'translateY(2rem)',
                clipPath: 'polygon(0% 80%, 0% 100%, 100% 100%, 100% 100%)'
            })
            .to(smallImgRef.current, {
                duration:0.3,
                transform: 'translateY(0px)',
                clipPath: 'polygon(0% -1%, 0% 100%, 100% 100%, 100% -1%)'
            }).to(imageBoxRef.current,{
                duration:0,
                backgroundImage:`url('${data[newPos].url}')`
            }).pause()

            t2.clear()
            t2.to(rightImgRef.current, {
                duration:0,
                transform: 'translateX(50vw)'
            }).to(rightImgRef.current, {
                duration:0.2,
                ease: "power2.in",
                transform: 'translateX(45vw)'
            })
            .to(rightImgRef.current, {
                duration:0.6,
                ease: "power2.out",
                transform: 'translateX(0vw)'
            }).to(rightBgRef.current,{
                duration:0,
                backgroundImage:`url('${data[newPos].url}')`
            }).pause()

            t4.clear()
            t4.to(titreRef.current,{
                duration:0.2,
                transform: 'translateY(0rem) rotateX(0deg)',
                opacity:1
            }).to(sousTitreRef.current,{
                duration:0.2,
                transform: 'translateY(0rem) rotateX(0deg)',
                opacity:1
            }).pause()

            t3.clear()
            t3.to(sousTitreRef.current,{
                duration:0.2,
                transform: 'translateY(2rem) rotateX(60deg)',
                opacity:0
            }).to(titreRef.current,{
                duration:0.2,
                transform: 'translateY(2rem) rotateX(60deg)',
                opacity:0,
                onComplete:()=>{
                    setSliderPos(newPos);
                }
            })
        }

    }

    useEffect(() => {
        t1.restart();
        t2.restart();
        t4.restart();
    }, [sliderPos])
        
        return (
            <div id="main">
            <div className="leftSection" style={{backgroundColor:data[sliderPos].color}}>
                <div className="blackFilter"></div>
                <div>
                    <CustomBtn manageClick={manageClick} deltaPos={-1} text='Previous' />
                    <CustomBtn manageClick={manageClick} deltaPos={1} text='Next' />
                </div>
                <div>
                    <div id="imageBox" ref={imageBoxRef} style={{backgroundImage:`url('${data[0].url}')`}}>
                        <img id="smallImg" src={data[sliderPos].url} ref={smallImgRef} alt=""/>
                    </div>
                    <h3 ref={titreRef}>{data[sliderPos].name} </h3>
                    <p ref={sousTitreRef}>{data[sliderPos].desc} </p>
                </div>
            </div>
            <div className="rightSection" ref={rightBgRef} style={{backgroundImage:`url('${data[0].url}')`}}>
                <img ref={rightImgRef} src={data[sliderPos].url} alt=""/>
                <div className="blackFilter"></div>
                <div className="textBox">
                    <h2>Collection</h2>
                    <span>A Collection Page Slider from an</span>
                    <span>original design by:  <a href="https://github.com/bekamais"><FaGithub />Bekamais</a> - <a href="https://www.youtube.com/channel/UCyDSAdiqhKgFMkrHArmrsSA"><FaYoutube />ALL.DESIGN</a></span>
                </div>
            </div>
        </div>
    )
}

export default CollectionScreen
