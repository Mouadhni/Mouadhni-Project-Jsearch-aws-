import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { ADRESS } from '@env';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  console.log(`Using address: ${ADRESS}`);

  const handleSignIn = async () => {
    try {
      const response = await fetch(`http://${ADRESS}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Sign-in successful!");
        router.push({
          pathname: "../home",
          params: { username }, // Pass username as a parameter
        });
      } else {
        alert(`Sign-in error: ${data.error}`);
      }
    } catch (error) {
      alert(`Sign-in error: ${error.message}`);
    }
  };

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("../signUp")}>
            Sign up
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "white", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "white",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff8c00",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { fontSize: 18, color: "white", fontWeight: "bold" },
  footerText: { marginTop: 20, fontSize: 14, color: "white" },
  link: { fontWeight: "bold", color: "#ffcc00" },
});

export default SignIn;
