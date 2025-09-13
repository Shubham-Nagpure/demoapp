import svgPaths from "./svg-14d64o95ud";

function Group() {
  return (
    <div className="absolute bottom-[6.88%] left-1/2 right-0 top-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 15">
        <g id="Group">
          <path d={svgPaths.p35a99b00} fill="var(--fill-0, #3BB3E3)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute bottom-0 left-0 right-1/2 top-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 16">
        <g id="Group">
          <path d={svgPaths.p2d57a000} fill="var(--fill-0, #4FC6F5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group />
      <Group1 />
    </div>
  );
}

export default function Filter53401401() {
  return (
    <div className="relative size-full" data-name="filter_5340140 1">
      <Group2 />
    </div>
  );
}