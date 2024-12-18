package com.singed.sindesk.domain.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.singed.sindesk.domain.ticket.Ticket;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity(name="users")
@Table(name="users")
@EqualsAndHashCode(of="Id")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String Id;

    private String login;

    @Column(unique = true,nullable = false)
    private String email;
    private String password;
    private String number;


    @OneToMany(mappedBy = "sender")
    @JsonManagedReference
    private List<Ticket> tickets;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @ColumnDefault("false")
    private Boolean verified;

    public User(String login,String email, String password, String number, UserRole role)
    {
        this.login = login;
        this.email = email;
        this.password = password;
        this.number = number;
        this.role = role;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.login;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
