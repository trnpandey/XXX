@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/**", "/ws/chat/**").authenticated()
            .anyRequest().permitAll()
            .and()
            .oauth2ResourceServer().jwt();
    }
}