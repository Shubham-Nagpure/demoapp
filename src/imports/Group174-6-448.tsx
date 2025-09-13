import svgPaths from "./svg-5yio7gxcho";
import imgScreenshot20250901At14854Am1 from "figma:asset/fb93d7978a6f1244e7ec9b696a9a7b1107f66aea.png";

function IconOutlineTrendingUp() {
  return (
    <div className="relative size-full" data-name="Icon/Outline/trending-up">
      <div className="absolute inset-[29.17%_12.5%]" data-name="Icon">
        <div className="absolute inset-[-10%_-5.56%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 10">
            <path d={svgPaths.p3e4d3880} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.58333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group172() {
  return (
    <div className="absolute contents leading-[0] left-[58px] text-[12px] text-nowrap top-0">
      <div className="absolute font-['Montserrat:Bold',_sans-serif] font-bold left-[58px] text-[#3284ff] top-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">IC Flow Diagram</p>
      </div>
      <div className="absolute font-['Montserrat:Medium',_sans-serif] font-medium left-[58px] text-[#697282] top-[17px]">
        <p className="leading-[20px] text-nowrap whitespace-pre">Interactive flows</p>
      </div>
    </div>
  );
}

function Frame2147223396() {
  return (
    <div className="absolute left-[9px] overflow-clip rounded-[8px] size-[33px] top-px">
      <div className="absolute left-[7px] overflow-clip size-[19px] top-[7px]" data-name="Icon/Outline/trending-up">
        <IconOutlineTrendingUp />
      </div>
    </div>
  );
}

function Group173() {
  return (
    <div className="absolute contents left-[9px] top-0">
      <Group172 />
      <Frame2147223396 />
    </div>
  );
}

export default function Group174() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-center bg-cover bg-no-repeat h-[381px] left-0 top-[69px] w-[212px]" data-name="Screenshot 2025-09-01 at 1.48.54 AM 1" style={{ backgroundImage: `url('${imgScreenshot20250901At14854Am1}')` }} />
      <Group173 />
    </div>
  );
}