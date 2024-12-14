import Section from "@/components/common/Section";
import Content from "@/components/common/Content";
import CourseExplorer from "@/components/explore/CourseExplorer";

export default function Explore() {
  return (
    <div className="flex flex-col gap-16 md:py-16">
      <Section size="2xl">
        <Content>
          <h1>Utforsk emner</h1>
          <p>Ønsker du å bli kjent med de ulike emnene NTNU har å tilby?</p>
        </Content>
      </Section>
      <CourseExplorer />
    </div>
  );
}
