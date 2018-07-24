import AuthenticationClass from './Authentication';
import SkillsClass from './Skills';

const Services = {
    Authentication : AuthenticationClass,
    Skills : new SkillsClass()
}
export default Services