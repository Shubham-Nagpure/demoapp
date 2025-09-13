import svgPaths from "./svg-m5x70vxzjx";
import imgScreenshot20250901At14854Am1 from "figma:asset/fb93d7978a6f1244e7ec9b696a9a7b1107f66aea.png";
import imgScreenshot20250901At122538Am3 from "figma:asset/83ec03c6408ca15161d38a918ad300c536154719.png";

function Group172() {
  return (
    <div className="absolute contents leading-[0] left-[75px] text-[12px] text-nowrap top-[157px]">
      <div className="absolute font-['Montserrat:Bold',_sans-serif] font-bold left-[75px] text-[#3284ff] top-[157px]">
        <p className="leading-[20px] text-nowrap whitespace-pre">IC Flow Diagram</p>
      </div>
      <div className="absolute font-['Montserrat:Medium',_sans-serif] font-medium left-[75px] text-[#697282] top-[174px]">
        <p className="leading-[20px] text-nowrap whitespace-pre">Interactive flows</p>
      </div>
    </div>
  );
}

function IconOutlineTrendingUp() {
  return (
    <div className="absolute left-[7px] size-[19px] top-[7px]" data-name="Icon/Outline/trending-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon/Outline/trending-up">
          <path d={svgPaths.p2f67bd60} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.58333" />
        </g>
      </svg>
    </div>
  );
}

function Frame2147223396() {
  return (
    <div className="absolute left-[26px] overflow-clip rounded-[8px] size-[33px] top-[158px]">
      <IconOutlineTrendingUp />
    </div>
  );
}

function Group173() {
  return (
    <div className="absolute contents left-[26px] top-[157px]">
      <Group172 />
      <Frame2147223396 />
    </div>
  );
}

function Group174() {
  return (
    <div className="absolute contents left-[17px] top-[157px]">
      <div className="absolute bg-center bg-cover bg-no-repeat h-[381px] left-[17px] top-[226px] w-[212px]" data-name="Screenshot 2025-09-01 at 1.48.54 AM 1" style={{ backgroundImage: `url('${imgScreenshot20250901At14854Am1}')` }} />
      <Group173 />
    </div>
  );
}

function PlanIcFlow() {
  return (
    <div className="absolute bg-white h-[1002px] left-0 overflow-clip top-0 w-[1512px]" data-name="Plan - IC flow">
      <div className="absolute bg-[50.52%_0%] bg-no-repeat bg-size-[658.46%_100%] h-[757px] left-[1305px] rounded-tl-[24px] top-[75px] w-[207px]" data-name="Screenshot 2025-09-01 at 12.25.38 AM 3" style={{ backgroundImage: `url('${imgScreenshot20250901At122538Am3}')` }} />
      <div className="absolute bg-bottom-left bg-no-repeat bg-size-[404.46%_461.59%] h-[164px] left-[1175px] rounded-tl-[24px] top-[822px] w-[337px]" data-name="Screenshot 2025-09-01 at 12.25.38 AM 4" style={{ backgroundImage: `url('${imgScreenshot20250901At122538Am3}')` }} />
      <div className="absolute bg-no-repeat bg-size-[127.5%_100%] bg-top-left h-[757px] left-[261px] rounded-tl-[24px] top-[76px] w-[1069px]" data-name="Screenshot 2025-09-01 at 12.25.38 AM 1" style={{ backgroundImage: `url('${imgScreenshot20250901At122538Am3}')` }} />
      <div className="absolute bg-no-repeat bg-size-[127.5%_100%] bg-top-left h-[757px] left-[261px] rounded-tl-[24px] top-[555px] w-[1069px]" data-name="Screenshot 2025-09-01 at 12.25.38 AM 2" style={{ backgroundImage: `url('${imgScreenshot20250901At122538Am3}')` }} />
      <Group174 />
      <div className="absolute font-['Montserrat:Medium',_sans-serif] font-medium leading-[0] left-[26px] text-[#4e4949] text-[12px] text-nowrap top-[108px]">
        <p className="leading-[20px] whitespace-pre">
          <span>{`Tools under `}</span>
          <span className="font-['Montserrat:Bold',_sans-serif] font-bold">Plan module</span>
        </p>
      </div>
    </div>
  );
}

export default function Frame2147223413() {
  return (
    <div className="bg-white relative size-full">
      <PlanIcFlow />
    </div>
  );
}