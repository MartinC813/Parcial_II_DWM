import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Comebol Pa nenes" }} />
            <Stack.Screen name="equipo" options={{ title: "Equipo especificado" }} />
        </Stack>
    );
}
