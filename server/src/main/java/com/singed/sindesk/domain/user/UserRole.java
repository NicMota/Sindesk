package com.singed.sindesk.domain.user;

public enum UserRole {
    COMMON("common"),
    ADMIN("admin");

    private String role;

    UserRole(String role)
    {
        this.role = role;
    }

    public String getRole()
    {
        return role;
    }
}
