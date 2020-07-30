import ruleColumns from './ruleColumn';
import courseColumns from './courseColumn';
import orgnColumns from './orgnColumn';
import classColumns from './classColumn';

// todo: 按需加载
import CourseUpdateForm from '../components/CourseUpdateForm';
import RuleUpdateForm from '../components/RuleUpdateForm';
import OrgnUpdateForm from '../components/OrgnUpdateForm';
import ClassUpdateForm from '../components/ClassUpdateForm/index';

export const ListConfig = {
  rule: {
    columns: ruleColumns,
    title: '规则',
    UpdateForm(props) {
      return <RuleUpdateForm {...props} />;
    },
  },
  orgn: {
    columns: orgnColumns,
    title: '组织',
    UpdateForm(props) {
      return <OrgnUpdateForm {...props} />;
    },
  },
  course: {
    columns: courseColumns,
    title: '课程',
    UpdateForm(props) {
      return <CourseUpdateForm {...props} />;
    },
  },
  class: {
    columns: classColumns,
    title: '班级',
    UpdateForm(props) {
      return <ClassUpdateForm {...props} />;
    },
  },
};
