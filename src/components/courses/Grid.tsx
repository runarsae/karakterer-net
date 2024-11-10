interface GridProps {
  hasGrades: boolean;
  children: React.ReactNode;
}

export function Grid({ hasGrades, children }: GridProps) {
  return (
    <>
      {/* prettier-ignore */}
      <div className={`
        grid 
        gap-4
        
        ${hasGrades ? `
        grid-cols-1
        grid-rows-[auto_auto_auto_auto_auto]
        [grid-template-areas:'grades''slider''totalaverage''totalfailpercentage''linecharts']
        
        xs:grid-cols-2
        xs:grid-rows-[auto_auto_auto_auto]
        xs:[grid-template-areas:'grades_grades''slider_slider''totalaverage_totalfailpercentage''linecharts_linecharts']         

        md:grid-cols-[minmax(0px,1fr)_240px]
        md:grid-rows-[auto_auto_auto_auto]
        md:[grid-template-areas:'grades_totalaverage''grades_totalfailpercentage''slider_slider''linecharts_linecharts']
        
        lg:grid-cols-[minmax(210px,0.5fr)_minmax(210px,0.5fr)_minmax(0px,1.5fr)]
        lg:grid-rows-[auto_auto_auto]
        lg:[grid-template-areas:'grades_grades_linecharts''slider_slider_linecharts''totalaverage_totalfailpercentage_linecharts']
        ` : `
        grid-cols-1
        grid-rows-[auto_auto_auto_auto]
        [grid-template-areas:'grades''slider''totalfailpercentage''linecharts']

        md:grid-cols-[minmax(0,1fr)_minmax(280px,auto)]
        md:grid-rows-[auto_auto_auto]
        md:[grid-template-areas:'grades_totalfailpercentage''slider_slider''linecharts_linecharts']
        
        lg:grid-cols-[minmax(420px,1fr)_minmax(0px,1.5fr)]
        lg:grid-rows-[1fr_auto_auto]
        lg:[grid-template-areas:'grades_linecharts''grades_totalfailpercentage''slider_totalfailpercentage']
        `}
      `}>
        {children}
      </div>
    </>
  );
}

export function LineChartsSubGrid({ hasGrades, children }: GridProps) {
  return (
    <>
      <div
        className={`grid grid-cols-1 gap-4 [grid-area:linecharts] ${
          hasGrades
            ? `grid-rows-[1fr_1fr] [grid-template-areas:'averages''failpercentages']`
            : `grid-rows-[1fr] [grid-template-areas:'failpercentages']`
        } `}
      >
        {children}
      </div>
    </>
  );
}
